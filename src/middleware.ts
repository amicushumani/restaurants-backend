
interface VerifyNewRestoArgs {
    name: string;
    rating: number;
    description: string;
}
export function verifyNewResto(req, res, next): boolean {
    const { name, rating, description } = req.body;
    console.log('name, rating, des', name, rating, description);
    if(!name || !rating || !description) {
        return res.status(400).send('An incomplete restaurant object was submitted')
    }

    return next();
}