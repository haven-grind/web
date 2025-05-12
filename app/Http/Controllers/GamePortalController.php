<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GamePortalController extends Controller
{
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'game_path' => ['required', 'file', 'mimes:zip', 'max:2048'],
        ]);

        $gamePath = Storage::disk('local')->putFile(
            'games',
            $request->file('game_path')
        );

        Game::create([
            'name' => $request->name,
            'description' => $request->description,
            'game_path' => $gamePath,
        ])->save();

        return redirect()->route('game.index')->with('success', 'Game uploaded successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game)
    {
        return Inertia::render('portal/show', [
            'game' => $game,
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
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'game_path' => ['sometimes', 'file', 'mimes:zip', 'max:2048'],
        ]);

        if ($request->hasFile('game_path')) {
            Storage::disk('local')->delete($game->game_path);

            $gamePath = Storage::disk('local')->putFile(
                'games',
                $request->file('game_path')
            );

            $game->update(['game_path' => $gamePath]);
            $game->save();
        }

        $game->update($request->only(['name', 'description']));

        return redirect()->route('game.index')->with('success', 'Game updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game)
    {
        Storage::disk('local')->delete($game->game_path);
        $game->delete();

        return redirect()->route('game.index')->with('success', 'Game deleted successfully!');
    }
}
