<?php

namespace App\Repositories;

use App\Interfaces\AuthInterface;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthRepository implements AuthInterface
{
    /**
     * @var User
     */
    protected $user;

    /**
     * AuthRepository constructor.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Login a user
     *
     * @param array $credentials
     * @return array
     */
    public function login(array $credentials): array
    {
        if (!Auth::attempt($credentials)) {
            return [
                'status' => false,
                'message' => 'Invalid credentials'
            ];
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'status' => true,
            'token' => $token,
            'user' => $user
        ];
    }

    /**
     * Logout the current user
     *
     * @return bool
     */
    public function logout(): bool
    {
        try {
            if (auth()->check()) {
                // Delete all tokens for the current user
                auth()->user()->tokens()->delete();
                return true;
            }
            return false;
        } catch (\Exception $e) {
            \Log::error('Logout error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get the authenticated user
     *
     * @return array|null
     */
    public function getAuthenticatedUser(): ?array
    {
        if (Auth::check()) {
            return Auth::user()->toArray();
        }
        return null;
    }
}
