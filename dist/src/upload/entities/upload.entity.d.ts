export declare enum UploadStatus {
    PENDING = "pending",
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare class Upload {
    id: string;
    userId?: string;
    status: UploadStatus;
    externalId: string;
    externalPath: string;
    mime: string;
    extension: string;
    active: boolean;
}
