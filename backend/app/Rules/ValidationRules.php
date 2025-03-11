<?php

namespace App\Rules;

class ValidationRules
{
    /**
     * Get user registration validation rules
     *
     * @return array
     */
    public static function registration(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'],
        ];
    }

    /**
     * Get user login validation rules
     *
     * @return array
     */
    public static function login(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }

    /**
     * Get password reset validation rules
     *
     * @return array
     */
    public static function passwordReset(): array
    {
        return [
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8', 'confirmed', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'],
        ];
    }

    /**
     * Get common password validation rules
     *
     * @return array
     */
    public static function passwordRules(): array
    {
        return [
            'required',
            'string',
            'min:8',
            'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
        ];
    }
}
