import { CanActivateFn } from '@angular/router';

export const deactivateGuard: CanActivateFn = (route, state) => {
  return window.confirm(
    'You have unsaved changes. Are you sure you want to leave'
  );
};
