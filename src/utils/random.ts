const POOL_SIZE = 256;
const pool = new Uint32Array(POOL_SIZE);
let cursor = POOL_SIZE;

export function secureRandom(): number {
	if (cursor >= POOL_SIZE) {
		crypto.getRandomValues(pool);
		cursor = 0;
	}
	return (pool.at(cursor++) ?? 0) / 4294967296;
}
