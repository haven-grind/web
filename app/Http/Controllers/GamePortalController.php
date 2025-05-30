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
            'genres' => Genre::orderedGenres()->take(7)->map(fn($genre) => [
                'id' => $genre->id,
                'name' => $genre->name,
                'gameCount' => Game::whereHas('details.genres', function ($query) use ($genre) {
                    $query->where('genre_id', $genre->id);
                })->count(),
            ]),
            'popularGames' => Game::getPopularGames(5)->map(fn($game) => [
                'id' => $game->id,
                'developer' => $game->user->name,
                'title' => $game->title,
                'thumbnail' => $game->details?->thumbnail,
                'genres' => $game->details?->genres->pluck('name'),
            ]),
            'newReleasedGames' => Game::getNewReleasedGames(5)->map(fn($game) => [
                'id' => $game->id,
                'developer' => $game->user->name,
                'title' => $game->title,
                'thumbnail' => $game->details?->thumbnail,
                'genres' => $game->details?->genres->pluck('name'),
            ]),
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

        $game = Game::with(['user', 'details.genres', 'details.screenshots', 'comments.user'])
            ->findOrFail($game->id);

        $gameData = [
            'id' => $game->id,
            'developer' => $game->user->name,
            'title' => $game->title,
            'description' => $game->description,
            'game_path' => $gamePath,
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
                'createdAt' => $comment->created_at->toDateTimeString(),
            ])->toArray(),
            'createdAt' => $game->created_at->format('M d, Y'),
        ];

        return Inertia::render('games/portal/play', [
            'game' => $gameData,
            'similarGames' => Game::getSimilarGames($game->id, 5)->map(fn($similarGame) => [
                'id' => $similarGame->id,
                'developer' => $similarGame->user->name,
                'title' => $similarGame->title,
                'thumbnail' => $similarGame->details?->thumbnail,
                'genres' => $similarGame->details?->genres->pluck('name'),
            ]),
        ]);
    }
}
