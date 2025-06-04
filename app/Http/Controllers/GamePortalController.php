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
            'featuredGame' => ($game = Game::getFeaturedGame()) ? [
                'id' => $game->id,
                'title' => $game->title,
                'description' => $game->description,
                'thumbnail' => $this->getGameThumbnail($game),
                'genres' => $game->details?->genres->pluck('name'),
            ] : null,
            'popularGames' => Game::getPopularGames(5)->map(fn($game) => [
                'id' => $game->id,
                'developer' => $game->user->name,
                'title' => $game->title,
                'thumbnail' => $this->getGameThumbnail($game),
                'genres' => $game->details?->genres->pluck('name'),
            ]),
            'newReleasedGames' => Game::getNewReleasedGames(5)->map(fn($game) => [
                'id' => $game->id,
                'developer' => $game->user->name,
                'title' => $game->title,
                'thumbnail' => $this->getGameThumbnail($game),
                'genres' => $game->details?->genres->pluck('name'),
            ]),
        ]);
    }

    public function games()
    {
        return Inertia::render('games/portal/games', [
            'games' => Game::all()->map(fn($game) => [
                'id' => $game->id,
                'developer' => $game->user->name,
                'title' => $game->title,
                'thumbnail' => $this->getGameThumbnail($game),
                'genres' => $game->details?->genres->pluck('name'),
            ]),
            'genres' => Genre::orderedGenres()
        ]);
    }

    public function play(Game $game)
    {
        $fetchedGame = Game::with(['user', 'details.genres', 'details.screenshots', 'comments.user'])
            ->findOrFail($game->id);

        $gameData = [
            'id' => $fetchedGame->id,
            'developer' => $fetchedGame->user->name,
            'title' => $fetchedGame->title,
            'description' => $fetchedGame->description,
            'game_path' => $this->getGamePath($game),
            'thumbnail' => $this->getGameThumbnail($game),
            'genres' => $fetchedGame->details?->genres->pluck('name'),
            'screenshots' => $this->getGameScreenshots($game),
            'comments' => $fetchedGame->comments->map(fn($comment) => [
                'id' => $comment->id,
                'user' => [
                    'id' => $comment->user->id,
                    'name' => $comment->user->name,
                ],
                'content' => $comment->content,
                'createdAt' => $comment->created_at->toDateTimeString(),
            ])->toArray(),
            'createdAt' => $fetchedGame->created_at->format('M d, Y'),
        ];

        return Inertia::render('games/portal/play', [
            'game' => $gameData,
            'similarGames' => Game::getSimilarGames($fetchedGame->id, 5)->map(fn($similarGame) => [
                'id' => $similarGame->id,
                'developer' => $similarGame->user->name,
                'title' => $similarGame->title,
                'thumbnail' => $this->getGameThumbnail($similarGame),
                'genres' => $similarGame->details?->genres->pluck('name'),
            ]),
        ]);
    }
}
