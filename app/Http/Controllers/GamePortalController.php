<?php

namespace App\Http\Controllers;

use App\Models\Game;
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
        ]);
    }
}
