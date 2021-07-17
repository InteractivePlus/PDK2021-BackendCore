interface BaseFactory{
    install() : Promise<void>;
    uninstall() : Promise<void>;
    clearData() : Promise<void>;
}

export type {BaseFactory};