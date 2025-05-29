<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Genre;
use App\Models\Tag;
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
            'gameCount' => Game::getOwnedGamesCount(),
            'totalPlays' => 0,
            'commentCount' => 0,
            'games' => Game::getOwnedGames(),
        ]);
    }

    public function create()
    {
        return Inertia::render('games/panel/create', [
            'gameGenres' => Genre::orderedGenres(),
            'gameTags' => Tag::orderedTags(),
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
        $gamePath = $game->game_path ? url('') . "/storage/$game->game_path/index.html" : null;

        $gameData = $game->toArray();
        $gameData['game_path'] = $gamePath;

        return Inertia::render('games/panel/show', [
            'game' => $gameData,
        ]);
    }

    public function destroy(Game $game)
    {
        $this->storageDisk->deleteDirectory($game->game_path);
        $game->delete();

        return redirect()->route('dashboard')->with('success', 'Game deleted successfully!');
    }
}
