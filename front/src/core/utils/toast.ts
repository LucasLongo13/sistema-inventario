interface Props {
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success' | 'default';
  position_x?: 'left' | 'right';
  position_y?: 'top' | 'bottom';
  width?: string;
}

export const Toast = (props: Props) => {
  const { message, type = 'default', position_x = 'right', position_y = 'top', width = 'w-[25rem]' } = props;

  let $type: string = '';
  if (type === 'info') {
    $type = `text-blue-800 bg-blue-50 dark:bg-evo-3 dark:text-blue-400 dark:border-blue-800`;
  } else if (type === 'warning') {
    $type = `text-yellow-800 bg-yellow-50 dark:bg-evo-3 dark:text-yellow-400 dark:border-yellow-800`;
  } else if (type === 'error') {
    $type = `text-red-800 bg-red-50 dark:bg-evo-3 dark:text-red-400 dark:border-red-800`;
  } else if (type === 'success') {
    $type = `text-green-800 bg-green-50 dark:bg-evo-3 dark:text-green-400 dark:border-green-800`;
  } else if (type === 'default') {
    $type = `text-gray-800 bg-gray-50 dark:bg-evo-3 dark:text-gray-400 dark:border-gray-800`;
  }

  let $position_y: string = '';
  if (position_y === 'top') {
    $position_y = 'top-5';
  } else if (position_y === 'bottom') {
    $position_y = 'bottom-5';
  }

  let $position_x: string = '';
  if (position_x === 'left') {
    $position_x = 'left-5';
  } else if (position_x === 'right') {
    $position_x = 'right-5';
  }

  let $btn: string = '';
  if (type === 'info') {
    $btn =
      'bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:bg-evo-3 dark:text-blue-400 dark:hover:bg-gray-700';
  } else if (type === 'warning') {
    $btn =
      'bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:bg-evo-3 dark:text-yellow-400 dark:hover:bg-gray-700';
  } else if (type === 'error') {
    $btn =
      'bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-evo-3 dark:text-red-400 dark:hover:bg-gray-700';
  } else if (type === 'success') {
    $btn =
      'bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-evo-3 dark:text-green-400 dark:hover:bg-gray-700';
  } else if (type === 'default') {
    $btn =
      'bg-gray-50 text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:bg-evo-3 dark:text-gray-400 dark:hover:bg-gray-700';
  }

  const style = `${$type} ${$position_y} ${$position_x} ${width}`;

  const existTargetEl: HTMLElement | null = document.getElementById('toast');

  if (existTargetEl) {
    existTargetEl?.parentNode?.removeChild(existTargetEl);
  }

  const htmlToast = `
    <div
      id="toast"
      class='flex fixed z-100 items-center p-4 text-sm border rounded-lg animate-fade-down animate-once animate-duration-[300ms] ${style}'
      role="alert"
    >
      <svg
        class="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        ></path>
      </svg>
      <div class="ms-3 text-sm font-medium">
        ${message}
      </div>
      <button
        type="button"
        class='ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 ${$btn}'
        aria-label="Close"
        id="toast-btn"
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
        </svg>
      </button>
    </div>
  `;

  document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', htmlToast);

  // target element and trigger
  const $targetEl: HTMLElement | null = document.getElementById('toast');
  const $triggerEl: HTMLElement | null = document.getElementById('toast-btn');

  const hideToast = () => {
    if (!$targetEl) return;
    $targetEl.classList.add('opacity-0', 'transition-opacity', 'duration-1000', 'ease-out');
    setTimeout(() => {
      $targetEl?.parentNode?.removeChild($targetEl);
    }, 1000);
  };

  $triggerEl?.addEventListener('click', hideToast);
  setTimeout(hideToast, 3500);

  return { hide: hideToast };
};

export const handleErrorToast = (error: any) => {
  let message = '';

  if (typeof error?.message === 'string') {
    message = error?.message;
  } else if (typeof error?.message === 'object') {
    message = error.message.join('<br/>');
  }

  Toast({
    message,
    type: 'error',
  });
};