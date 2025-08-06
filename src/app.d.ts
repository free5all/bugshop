import type { SessionValidationResult } from '$lib/server/auth';

declare global {
	namespace App {
		interface Locals {
			user: SessionValidationResult['user'];
			session: SessionValidationResult['session'];
			shops: SessionValidationResult['shops'];
			cart?: SessionValidationResult['cart'];
			cartItems?: SessionValidationResult['cartItems'];
		}
		interface PageData {
			user: SessionValidationResult['user'];
			session: SessionValidationResult['session'];
			shops: SessionValidationResult['shops'];
			cart?: SessionValidationResult['cart'];
			cartItems?: SessionValidationResult['cartItems'];
		}
	} // interface Error {}
	// interface Locals {}
} // interface PageData {}
// interface PageState {}

// interface Platform {}
export {};
