<?php

use App\Http\Middleware\ForceJsonHeader;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Laravel\Passport\Exceptions\AuthenticationException as ExceptionsAuthenticationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(ForceJsonHeader::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {

        

        // Handle NotFoundHttpException
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            $response = [
                "data" => [],
                "message" => $e->getMessage(),
                "success" => false
            ];
            if ($request->expectsJson()) {
                return response()->json($response, 404);
            }
        });
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            $response = [
                "data" => [],
                "message" => $e->getMessage(),
                "success" => false
            ];
            if ($request->expectsJson()) {
                return response()->json($response, 401);
            }
            return redirect()->guest(route('login'));
        });

        // Handle other exceptions
        $exceptions->render(function (Throwable $e, Request $request) {
            $response = [
                "data" => [],
                "message" => $e->getMessage(),
                "success" => false
            ];
            if ($request->expectsJson()) {
                return response()->json($response, 500);
            }
            return response()->view('errors.500', ['error' => $e->getMessage()], 500);
        });
        
    })->create();

