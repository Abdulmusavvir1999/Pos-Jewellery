import { inject } from '@angular/core';
import { CanActivateFn, ResolveFn } from '@angular/router';
import { CommonService } from '../Service/common.service';

export const resloveGuard: ResolveFn<any> = (route, state) => {
  let commonService = inject(CommonService)
  return setTimeout(() => {

  }, 2000);
};
