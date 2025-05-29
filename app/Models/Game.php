<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Game extends Model
{
    protected $table = "games";
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'game_path',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function details()
    {
        return $this->hasOne(GameDetail::class);
    }

    private static function fetchOwnedGames()
    {
        return self::where('user_id', Auth::user()->id);
    }

    public static function getOwnedGames()
    {
        return self::fetchOwnedGames()->get();
    }

    public static function getOwnedGamesCount()
    {
        return self::fetchOwnedGames()->count();
    }

    public static function getPopularGames($amount)
    {
        // DUMMY: Fetch popular games based on some criteria, e.g., play count or ratings.
        return self::take($amount)->get();
    }

    public static function getNewReleasedGames($amount)
    {
        return self::orderBy('created_at', 'desc')->take($amount)->get();
    }

    public static function getSimilarGames($gameId, $amount)
    {
        // DUMMY: Fetch similar games based on genres or tags.
        return self::where('id', '!=', $gameId)->take($amount)->get();
    }
}
