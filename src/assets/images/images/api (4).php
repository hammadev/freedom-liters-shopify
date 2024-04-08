<?php

use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\LogActivityController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TrainingProgramController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\testimonialController;
use App\Http\Controllers\Api\PagesController;
use App\Http\Controllers\Api\TrainerApiController;
use App\Http\Controllers\Api\ArticalController;
use App\Http\Controllers\Api\MacrosContoller;
use App\Http\Controllers\Api\LevelController;
use App\Http\Controllers\Api\AvatarController;
use App\Http\Controllers\Api\DietPlanController;
use App\Http\Controllers\Api\EatingController;
use App\Http\Controllers\Api\PricingController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\WishlistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/logout', [AuthController::class, 'logout']);

    Route::delete('/remove-account', [AuthController::class, 'remove_account']);

    Route::post('profile-update', [AuthController::class, 'update_profile'])->middleware('auth:sanctum');

    Route::get('food-list', [FoodController::class, 'get_foods']);

    Route::prefix('profile')->group(function () {
        Route::controller(ProfileController::class)->group(function () {
            Route::get('/body-weight', 'body_weight');
            Route::post('/body-weight-store', 'body_weight_store');
        });
    });

    Route::controller(MacrosContoller::class)->group(function () {
        Route::get('/macros', 'macros');
        Route::post('/store-macros', 'store');
        Route::put('/update-macros', 'update_macros');
    });

    Route::controller(AppointmentController::class)->group(function () {
        Route::get('/appointment', 'index');
        Route::post('/add-appointment', 'store');
        Route::get('/appointment-timing', 'timingInfo');
        Route::post('/cancel-appointment', 'cancelAppointment');
    });

    Route::controller(TrainingProgramController::class)->group(function () {
        Route::get('/my-program/{date?}', 'my_program');
        Route::get('/exercise-by-day', 'exercise_by_day');
        Route::put('/update-activity', 'update_activity');
    });

    Route::put('meal-plan/update-activity', [DietPlanController::class, 'updateActivity']);
    Route::get('meal-plan/assigned', [DietPlanController::class, 'assignedMealPlan']);

    Route::post('wishlist', [WishlistController::class, 'toggleItem']);
    Route::get('wishlist', [WishlistController::class, 'getUserWishlist']);

    Route::prefix('activity')->group(function () {
        Route::get('/', [ActivityController::class, 'today_activity']);
    });
});

Route::prefix('meal-plans')->group(function () {
    Route::get('/', [DietPlanController::class, 'index']);
    Route::get('/recipies', [DietPlanController::class, 'getRecipies']);
    Route::get('/recipe/{id}', [DietPlanController::class, 'getRecipeById']);
});

Route::get('goals', [MacrosContoller::class, 'get_goals']);

Route::get('training-programs', [TrainingProgramController::class, 'training_programs']);
Route::get('trainers', [TrainerApiController::class, 'trainers']);
Route::get('pricing', [PricingController::class, 'get_pricing']);

Route::get('faqs', [FaqController::class, 'faqs']);

Route::get('pages/{key}', [PagesController::class, 'get_pages']);

Route::get('search', [PagesController::class, 'search']);


Route::get('levels', [LevelController::class, 'get_levels']);

Route::get('avatars', [AvatarController::class, 'get_avatars']);

Route::get('eating-styles', [EatingController::class, 'get_eating_style']);

Route::get('testimonials', [testimonialController::class, 'testimonials']);

Route::get('articles', [ArticalController::class, 'Articles']);

Route::post('log-activity', [LogActivityController::class, 'store']);

// AUTH CONTROLLER API'S
Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'sign_up']);

Route::post('reset-password', [AuthController::class, 'resetPassword']);

Route::post('code-check', [AuthController::class, 'CodeCheck']);

Route::post('password-reset', [AuthController::class, 'addNewPassword']);


Route::fallback(function () {
    return response()->json(['error' => 'Route not found.'], 404);
});