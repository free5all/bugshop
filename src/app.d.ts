import type { SessionValidationResult } from '$lib/server/auth';

declare global {
	namespace App {
		interface Locals {
			user: SessionValidationResult['user'];
			session: SessionValidationResult['session'];
		}
		interface PageData {
			user: SessionValidationResult['user'];
			session: SessionValidationResult['session'];
		}
	} // interface Error {}
	// interface Locals {}
} // interface PageData {}
// interface PageState {}

// interface Platform {}
export {};
