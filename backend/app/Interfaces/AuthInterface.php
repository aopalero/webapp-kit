<?php

namespace App\Interfaces;

interface AuthInterface
{
    /**
     * Login a user
     *
     * @param array $credentials
     * @return array
     */
    public function login(array $credentials): array;

    /**
     * Logout the current user
     *
     * @return bool
     */
    public function logout(): bool;

    /**
     * Get the authenticated user
     *
     * @return array|null
     */
    public function getAuthenticatedUser(): ?array;
}
