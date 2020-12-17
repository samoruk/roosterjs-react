/// <reference types="react" />
import { DirectionalHint } from "office-ui-fabric-react/lib/ContextualMenu";
import { RoosterCommandBarButton } from "../schema/RoosterCommandBarSchema";
export interface IconOnRenderDelegateOptions {
    customCacheKey?: string;
    highContrastAssetName?: string;
    assets?: {
        name: string;
        className?: string;
    }[];
    tooltipDirectionHint?: DirectionalHint;
}
export declare type ButtonOnRenderDelegate = (item: RoosterCommandBarButton) => JSX.Element;
export declare function getIconOnRenderDelegate(highContrastAssetName?: string, ...assets: {
    name: string;
    className?: string;
}[]): ButtonOnRenderDelegate;
export declare function getIconOnRenderDelegateWithCustomCacheKey(customCacheKey: string, highContrastAssetName?: string, ...assets: {
    name: string;
    className?: string;
}[]): ButtonOnRenderDelegate;
export declare function getIconButtonOnRenderDelegate(options?: IconOnRenderDelegateOptions): ButtonOnRenderDelegate;
