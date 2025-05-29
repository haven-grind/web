<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameDetail extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory;

    protected $table = "game_details";
    protected $fillable = [
        'game_id',
        'thumbnail',
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function screenshots()
    {
        return $this->hasMany(Screenshot::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'game_detail_genre')->withTimestamps();
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'game_detail_tag')->withTimestamps();
    }
}
