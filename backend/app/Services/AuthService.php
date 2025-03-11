<?php

namespace App\Services;

use App\Interfaces\AuthInterface;

class AuthService
{
    /**
     * @var AuthInterface
     */
    protected $authRepository;

    /**
     * AuthService constructor.
     *
     * @param AuthInterface $authRepository
     */
    public function __construct(AuthInterface $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    /**
     * Login a user
     *
     * @param array $credentials
     * @return array
     */
    public function login(array $credentials): array
    {
        return $this->authRepository->login($credentials);
    }

    /**
     * Logout the current user
     *
     * @return bool
     */
    public function logout(): bool
    {
        return $this->authRepository->logout();
    }

    /**
     * Get the authenticated user
     *
     * @return array|null
     */
    public function getAuthenticatedUser(): ?array
    {
        return $this->authRepository->getAuthenticatedUser();
    }
}
