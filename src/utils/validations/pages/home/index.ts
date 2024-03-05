import { messages } from '@/constants/messages';
import { regexPatterns } from '@/constants/regexs';
import zod from '@/utils/zod';

const schema = zod.object({
  linkFile: zod
    .string()
    .trim()
    .nonempty(messages.REQUIRED())
    .refine((value: string) => regexPatterns.LINK.test(value), {
      message: messages.INVALID_LINK(),
    }),
});

export { schema };
