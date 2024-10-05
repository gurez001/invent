import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IAuditLog extends Document {
  userId: Types.ObjectId; // Ensure it's of type ObjectId
  updateLogs: {
    updatedBy: Types.ObjectId; // Also ensure it's ObjectId
    updatedFields: any;
    timestamp: Date;
  }[];
}

const auditLogSchema = new Schema<IAuditLog>({
  userId: { type: Schema.Types.ObjectId,    ref: "User"},
  updateLogs: [{
    updatedBy: { type: Schema.Types.ObjectId,    ref: "User"},
    updatedFields: { type: Schema.Types.Mixed, required: true },
    timestamp: { type: Date, default: Date.now }
  }]
});

const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
export default AuditLog;
