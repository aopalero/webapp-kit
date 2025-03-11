<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    /**
     * @var AuthService
     */
    protected $authService;

    /**
     * AuthController constructor.
     *
     * @param AuthService $authService
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Login a user
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->validated());

        if (!$result['status']) {
            return response()->json([
                'message' => $result['message']
            ], 401);
        }

        return response()->json([
            'token' => $result['token'],
            'user' => $result['user']
        ]);
    }

    /**
     * Logout the current user
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        $this->authService->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Get the authenticated user
     *
     * @return JsonResponse
     */
    public function user(): JsonResponse
    {
        $user = $this->authService->getAuthenticatedUser();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        return response()->json($user);
    }
}
