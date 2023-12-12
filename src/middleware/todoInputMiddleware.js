import * as yup from 'yup';

export default async function toDoInputMiddleware(ctx, next) {
    try {
        const postData = ctx.request.body;
        let schema = yup.object().shape({
            name: yup.string().required(),
            createAt: yup.date().default(() => new Date()),
        });
        await schema.validate(postData);
        next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        }
    }
}
