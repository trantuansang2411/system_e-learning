import axiosClient from "./axiosClient";
import type { Certificate } from "../types";

export const certificateService = {
  getMyCertificates() {
    return axiosClient.get<Certificate[]>("/api/v1/certificates");
  },

  verifyCertificate(certificateId: string) {
    return axiosClient.get<{ valid: boolean; certificate: Certificate }>(`/api/v1/certificates/verify/${certificateId}`);
  },
};
