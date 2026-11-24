import type { HTMLAttributes } from 'svelte/elements';
import 'syw-common/css/styles.css';
import type { SywEmbedProps } from 'syw-common/types/embed';
import { type SywImageAttrs } from '../store/ui.js';
type $$ComponentProps = SywEmbedProps & Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
    class?: string | null;
    imageAttrs?: SywImageAttrs;
};
declare const App: import("svelte").Component<$$ComponentProps, {}, "">;
type App = ReturnType<typeof App>;
export default App;
