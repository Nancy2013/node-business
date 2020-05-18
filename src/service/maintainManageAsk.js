import { HTTP_METHOD } from 'configPath/index';
import { reqHandle } from 'commonPath/ajax';

export default {
  // 查询
  modSiteDetails: reqHandle('/site/modcheck', {
    method: HTTP_METHOD.POST,
  }),
};
