
interface VerifyNewRestoArgs {
    name: string;
    rating: number;
    description: string;
}
export function verifyNewResto(req, res, next): void {
    const { name, rating, description } = req.body;
    console.log('name, rating, des', name, rating, description);
    if(!name || !rating || !description) {
        return res.status(400).send('An incomplete restaurant object was submitted')
    }

    next();
}

export function verifyEditResto(req, res, next): void {
    const { id, name, rating, description } = req.body;
    if(!name || !rating || !description) {
        res.status(400).send('An incomplete restaurant object was submitted for edit')
    }

    next();
}