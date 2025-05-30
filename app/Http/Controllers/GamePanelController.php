<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Game;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'game_path' => ['file', 'mimes:zip'],
        ]);

        $authUser = Auth::user();

        $zip = new \ZipArchive();
        $file = $request->file('game_path');
        $filePath = $file->getRealPath();
        $fileNameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        $storageFolder = "games/$request->title/$fileNameWithoutExt";
        $storagePath = $this->storageDisk->path($storageFolder);

        if ($zip->open($filePath) === true) {
            $zip->extractTo($storagePath);
            $zip->close();
        } else {
            return redirect()->back()->withErrors(['game_path' => 'Invalid zip file']);
        }

        Game::create([
            'user_id' => $authUser->id,
            'title' => $request->title,
            'description' => $request->description,
            'game_path' => $storageFolder,
        ])->save();

        return redirect()->route('dashboard')->with('success', 'Game uploaded successfully!');
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
