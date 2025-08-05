import type { SessionValidationResult } from '$lib/server/auth';

declare global {
	namespace App {
		interface Locals {
			user: SessionValidationResult['user'];
			session: SessionValidationResult['session'];
			shops: SessionValidationResult['shops'];
		}
		interface PageData {
			user: SessionValidationResult['user'];
			session: SessionValidationResult['session'];
			shops: SessionValidationResult['shops'];
		}
	} // interface Error {}
	// interface Locals {}
} // interface PageData {}
// interface PageState {}

// interface Platform {}
export {};
