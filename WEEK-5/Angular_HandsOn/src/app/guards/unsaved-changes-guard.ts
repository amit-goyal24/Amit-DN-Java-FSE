import { CanDeactivateFn } from '@angular/router';

/**
 * Component must implement this interface to work with the unsavedChangesGuard
 */
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

/**
 * UnsavedChangesGuard: Prevents navigation away from a component with unsaved changes.
 * Prompts user to confirm before leaving if changes exist.
 */
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (!component || !component.canDeactivate) {
    return true; // No guard needed if component doesn't implement interface
  }

  const canDeactivate = component.canDeactivate();
  if (canDeactivate === true) {
    return true; // No unsaved changes, allow navigation
  }

  // Unsaved changes detected, prompt user
  const confirmMessage = 'You have unsaved changes. Are you sure you want to leave?';
  return window.confirm(confirmMessage);
};
