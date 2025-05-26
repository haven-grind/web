<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $table = "genres";
    protected $fillable = ['name'];

    public function gameDetails()
    {
        return $this->belongsToMany(GameDetail::class, 'game_detail_genre');
    }

    public static function orderedGenres()
    {
        return self::orderBy('name')->get();
    }
}
