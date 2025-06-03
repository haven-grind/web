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
                'thumbnail' => $this->getGameThumbnail($game),
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

        DB::beginTransaction();

        try {
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
                    'path' => $this->getGamePath($game),
                    'fileName' => basename($game->game_path),
                ],
                'thumbnail' => $this->getGameThumbnail($game),
                'genres' => $game->details?->genres->pluck('id'),
                'screenshots' => $this->getGameScreenshots($game),
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

    // REVIEW: This method is not tested yet.
    public function update(Request $request, Game $game)
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

        DB::beginTransaction();

        try {
            if ($request->hasFile('game_path')) {
                $zip = new \ZipArchive();
                $file = $request->file('game_path');
                $fileNameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $storageFolder = "games/{$request->title}/{$fileNameWithoutExt}";
                $storagePath = $this->storageDisk->path($storageFolder);

                if ($zip->open($file->getRealPath()) === true) {
                    $zip->extractTo($storagePath);
                    $zip->close();
                    $game->game_path = $storageFolder;
                } else {
                    return redirect()->back()->withErrors(['game_path' => 'Invalid zip file']);
                }
            }

            if ($request->hasFile('thumbnail')) {
                // Delete old thumbnail if exists
                if ($game->details?->thumbnail && $this->storageDisk->exists($game->details->thumbnail)) {
                    $this->storageDisk->delete($game->details->thumbnail);
                }

                $file = $request->file('thumbnail');
                $fileNameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $storageFolder = "images/thumbnails/{$request->title}/{$fileNameWithoutExt}";
                $thumbnailPath = $this->storageDisk->putFileAs(
                    $storageFolder,
                    $file,
                    $file->getClientOriginalName()
                );
                $game->details?->update(['thumbnail' => $thumbnailPath]);
            }

            if ($request->hasFile('screenshots')) {
                // Delete old screenshots if exist
                if ($game->details && $game->details->screenshots()->count() > 0) {
                    foreach ($game->details->screenshots as $screenshot) {
                        if ($this->storageDisk->exists($screenshot->image_url)) {
                            $this->storageDisk->delete($screenshot->image_url);
                        }
                        $screenshot->delete();
                    }
                }

                foreach ($request->file('screenshots') as $screenshot) {
                    $path = $this->storageDisk->putFileAs(
                        "images/screenshots/{$request->title}",
                        $screenshot,
                        $screenshot->getClientOriginalName()
                    );
                    $game->details?->screenshots()->create(['image_url' => $path]);
                }
            }

            // Update game details
            $game->update([
                'title' => $request->title,
                'description' => $request->description,
            ]);

            if ($request->filled('genres')) {
                $game->details?->genres()->sync($request->genres);
            }

            DB::commit();
            return redirect()->route('dashboard')->with('success', 'Game updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Failed to update game.']);
        }
    }

    public function destroy(Game $game)
    {
        DB::beginTransaction();

        try {
            if ($game->game_path) {
                $this->storageDisk->deleteDirectory("games/$game->title");
            }

            if ($game->details?->thumbnail) {
                $this->storageDisk->deleteDirectory("images/thumbnails/{$game->title}");
            }

            if ($game->details?->screenshots) {
                $this->storageDisk->deleteDirectory("images/screenshots/{$game->title}");
            }

            $game->delete();

            DB::commit();
            return redirect()->route('dashboard')->with('success', 'Game deleted successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Failed to delete game.']);
        }
    }
}
