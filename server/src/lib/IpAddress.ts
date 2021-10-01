import { createParamDecorator } from '@nestjs/common';

import * as requestIp from 'request-ip';

export const IpAddress = createParamDecorator((data, req) => {
  if (req.args[0].clientIp) return req.args[0].clientIp;
  return requestIp.getClientIp(req); // In case we forgot to include requestIp.mw() in main.ts
});
