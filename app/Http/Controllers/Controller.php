<?php

namespace App\Http\Controllers;

use App\Models\Game;

abstract class Controller
{
    protected function getGamePath(Game $game)
    {
        return $game->game_path ? url('') . "/storage/$game->game_path/index.html" : null;
    }

    protected function getGameThumbnail(Game $game)
    {
        if (str_starts_with($game->details?->thumbnail, 'http')) {
            return $game->details->thumbnail;
        }

        return $game->details?->thumbnail ? url('') . "/storage/{$game->details->thumbnail}" : null;
    }

    protected function getGameScreenshots(Game $game)
    {
        if (str_starts_with($game->details?->screenshots->first()?->image_url, 'http')) {
            return $game->details?->screenshots->pluck('image_url');
        }

        return $game->details?->screenshots->pluck('image_url')->map(fn($url) => url('') . "/storage/$url");
    }
}
