<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GamePortalController extends Controller
{
    public function index()
    {
        return Inertia::render('games/portal/home', [
            'popularGames' => Game::getPopularGames(5),
            'newReleasedGames' => Game::getNewReleasedGames(5),
        ]);
    }

    public function games()
    {
        return Inertia::render('games/portal/games', [
            'games' => Game::all(),
            'genres' => Genre::orderedGenres()
        ]);
    }

    public function play(Game $game)
    {
        $gamePath = $game->game_path ? url('') . "/storage/$game->game_path/index.html" : null;

        $gameData = $game->toArray();
        $gameData['game_path'] = $gamePath;

        return Inertia::render('games/portal/play', [
            'game' => $gameData,
            'similarGames' => Game::getSimilarGames($game->id, 5),
        ]);
    }
}
