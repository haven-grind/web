<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = "tags";
    protected $fillable = ['name'];

    public function gameDetails()
    {
        return $this->belongsToMany(GameDetail::class, 'game_detail_tag');
    }

    public static function orderedTags()
    {
        return self::orderBy('name')->get();
    }
}
