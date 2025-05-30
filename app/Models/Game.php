<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Game extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory;

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

    public function comments()
    {
        return $this->hasMany(Comment::class);
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
        $genreIds = GameDetail::where('game_id', $gameId)
            ->first()
            ?->genres()
            ->pluck('genres.id')
            ->toArray();

        if (empty($genreIds)) {
            return collect();
        }

        return self::where('id', '!=', $gameId)
            ->whereHas('details.genres', function ($query) use ($genreIds) {
                $query->whereIn('genres.id', $genreIds);
            })
            ->take($amount)
            ->get();
    }
}
