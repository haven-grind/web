<?php

use App\Http\Controllers\GamePanelController;
use App\Http\Controllers\GamePortalController;
use Illuminate\Support\Facades\Route;

Route::get('/', [GamePortalController::class, 'index'])->name('home');
Route::get('/games', [GamePortalController::class, 'games'])->name('games');
Route::get('/play/{game}', [GamePortalController::class, 'play'])->name('play');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [GamePanelController::class, 'index'])->name('dashboard');
    Route::get('/game/create', [GamePanelController::class, 'create'])->name('game.create');
    Route::post('/game/store', [GamePanelController::class, 'store'])->name('game.store');
    Route::get('/game/{game}', [GamePanelController::class, 'show'])->name('game.show');
    Route::delete('/game/{game}', [GamePanelController::class, 'destroy'])->name('game.destroy');

    // Route::resource("/game", GamePortalControllerOld::class)
    //     ->names([
    //         'index' => 'game.index',
    //         'create' => 'game.create',
    //         'store' => 'game.store',
    //         'show' => 'game.show',
    //         'edit' => 'game.edit',
    //         'update' => 'game.update',
    //         'destroy' => 'game.destroy',
    //     ]);
});

// Route list: 127.0.0.1:8000
// - /                      => Home page
// - /games                 => Browse games page
// - /play/{game}           => Play game page
// - /login                 => Login page
// - /register              => Registration page
// - /dashboard             => User dashboard
// - /game/create           => Create game page
// - /game/{game}           => Show game details
// - /game/{game}/edit      => Edit game page

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
