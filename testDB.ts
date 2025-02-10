import { createUser, getUser } from '@/db.ts';

(async () => {
    await createUser("12345", "test-token", "John Doe", "https://example.com/avatar.jpg");
    const user = await getUser("12345");
    console.log(user);
})();
