interface BaseFactory<InstallParams>{
    install(params : InstallParams) : Promise<void>;
    uninstall() : Promise<void>;
    clearData() : Promise<void>;
}

export type {BaseFactory};