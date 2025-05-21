<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GamePortalController extends Controller
{
    private $storageDisk;

    public function __construct()
    {
        $this->storageDisk = Storage::disk('public');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('portal/index', [
            'games' => Game::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('portal/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'game_path' => ['required', 'file', 'mimes:zip'],
        ]);

        $zip = new \ZipArchive();
        $file = $request->file('game_path');
        $filePath = $file->getRealPath();
        $fileNameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        $storageFolder = 'games/' . $request->title . '/' . $fileNameWithoutExt;
        $storagePath = $this->storageDisk->path($storageFolder);

        if ($zip->open($filePath) === true) {
            $zip->extractTo($storagePath);
            $zip->close();
        } else {
            return redirect()->back()->withErrors(['game_path' => 'Invalid zip file']);
        }

        Game::create([
            'title' => $request->title,
            'description' => $request->description,
            'game_path' => $storageFolder,
        ])->save();

        return redirect()->route('game.index')->with('success', 'Game uploaded successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game)
    {
        $gameData = $game->toArray();
        $gameData['game_path'] = url('') . "/storage/$game->game_path/index.html";

        return Inertia::render('portal/show', [
            'game' => $gameData,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Game $game)
    {
        return Inertia::render('portal/edit', [
            'game' => $game,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Game $game)
    {
        // REVIEW: This is not tested yet
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'game_path' => ['sometimes', 'file', 'mimes:zip'],
        ]);

        if ($request->hasFile('game_path')) {
            $this->storageDisk->delete($game->game_path);

            $gamePath = $this->storageDisk->putFile(
                'games',
                $request->file('game_path')
            );

            $game->update(['game_path' => $gamePath]);
            $game->save();
        }

        $game->update($request->only(['title', 'description']));

        return redirect()->route('game.index')->with('success', 'Game updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game)
    {
        $this->storageDisk->deleteDirectory($game->game_path);
        $game->delete();

        return redirect()->route('game.index')->with('success', 'Game deleted successfully!');
    }
}
