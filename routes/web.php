<?php

use App\Http\Controllers\GamePanelController;
use App\Http\Controllers\GamePortalController;
use Illuminate\Support\Facades\Route;

Route::get('/', [GamePortalController::class, 'index'])->name('home');
Route::get('/games', [GamePortalController::class, 'games'])->name('games');

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

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
