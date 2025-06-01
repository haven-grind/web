<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Game;
use App\Models\GameDetail;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GamePanelController extends Controller
{
    private $storageDisk;

    public function __construct()
    {
        $this->storageDisk = Storage::disk('public');
    }

    public function index()
    {
        return Inertia::render('games/panel/index', [
            'totalPlays' => 0,
            'games' => Game::getOwnedGames()->map(fn($game) => [
                'id' => $game->id,
                'developer' => $game->user->name,
                'title' => $game->title,
                'thumbnail' => $game->details?->thumbnail,
                'genres' => $game->details?->genres->pluck('name'),
            ]),
            'comments' => Comment::with('user', 'game')
                ->whereHas('game', function ($query) {
                    $query->where('user_id', Auth::id());
                })
                ->latest()
                ->get()
                ->map(fn($comment) => [
                    'id' => $comment->id,
                    'user' => [
                        'id' => $comment->user->id,
                        'name' => $comment->user->name,
                    ],
                    'game' => [
                        'id' => $comment->game->id,
                        'title' => $comment->game->title,
                    ],
                    'content' => $comment->content,
                    'createdAt' => $comment->created_at->format('M d, Y'),
                ]),
        ]);
    }

    public function create()
    {
        return Inertia::render('games/panel/create', [
            'genres' => Genre::orderedGenres(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['string', 'max:255'],
            'description' => ['string', 'max:1000'],
            'game_path' => ['nullable', 'file', 'mimes:zip'],
            'thumbnail' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif'],
            'screenshots' => ['nullable', 'array'],
            'screenshots.*' => ['image', 'mimes:jpg,jpeg,png,gif'],
            'genres' => ['nullable', 'array'],
            'genres.*' => ['exists:genres,id'],
        ]);

        $authUser = Auth::user();

        // Use transaction for data integrity
        DB::beginTransaction();

        try {
            // Handle game zip upload and extraction
            $gamePath = '';
            if ($request->hasFile('game_path')) {
                $zip = new \ZipArchive();
                $file = $request->file('game_path');
                $fileNameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $storageFolder = "games/{$request->title}/{$fileNameWithoutExt}";
                $storagePath = $this->storageDisk->path($storageFolder);

                if ($zip->open($file->getRealPath()) === true) {
                    $zip->extractTo($storagePath);
                    $zip->close();
                    $gamePath = $storageFolder;
                } else {
                    return redirect()->back()->withErrors(['game_path' => 'Invalid zip file']);
                }
            }

            // Handle thumbnail upload
            $thumbnailPath = '';
            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                $fileNameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $storageFolder = "images/thumbnails/{$request->title}/{$fileNameWithoutExt}";
                $thumbnailPath = $this->storageDisk->putFileAs(
                    $storageFolder,
                    $file,
                    $file->getClientOriginalName()
                );
            }

            // Handle screenshots upload
            $screenshotPaths = [];
            if ($request->hasFile('screenshots')) {
                foreach ($request->file('screenshots') as $screenshot) {
                    $path = $this->storageDisk->putFileAs(
                        "images/screenshots/{$request->title}",
                        $screenshot,
                        $screenshot->getClientOriginalName()
                    );
                    $screenshotPaths[] = $path;
                }
            }

            // Store game and related data
            $game = Game::create([
                'user_id' => $authUser->id,
                'title' => $request->title,
                'description' => $request->description,
                'game_path' => $gamePath,
            ]);

            $gameDetail = GameDetail::create([
                'game_id' => $game->id,
                'thumbnail' => $thumbnailPath,
            ]);

            if ($request->filled('genres')) {
                $gameDetail->genres()->attach($request->genres);
            }

            foreach ($screenshotPaths as $path) {
                $gameDetail->screenshots()->create(['image_url' => $path]);
            }

            DB::commit();
            return redirect()->route('dashboard')->with('success', 'Game uploaded successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Failed to upload game.']);
        }
    }

    public function show(Game $game)
    {
        return Inertia::render('games/panel/show', [
            'game' => [
                'id' => $game->id,
                'title' => $game->title,
                'description' => $game->description,
                'gameFile' => [
                    'path' => $game->game_path,
                    'fileName' => basename($game->game_path),
                ],
                'thumbnail' => $game->details?->thumbnail,
                'genres' => $game->details?->genres->pluck('name'),
                'screenshots' => $game->details?->screenshots->pluck('image_url'),
                'comments' => $game->comments->map(fn($comment) => [
                    'id' => $comment->id,
                    'user' => [
                        'id' => $comment->user->id,
                        'name' => $comment->user->name,
                    ],
                    'content' => $comment->content,
                    'createdAt' => $comment->created_at->format('M d, Y'),
                ])->toArray(),
            ],
            'genres' => Genre::orderedGenres(),
        ]);
    }

    public function destroy(Game $game)
    {
        $this->storageDisk->deleteDirectory($game->game_path);
        $game->delete();

        return redirect()->route('dashboard')->with('success', 'Game deleted successfully!');
    }
}
