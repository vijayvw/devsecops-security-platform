FROM node:22-bookworm

ARG TARGETARCH

# Versions
ARG GITLEAKS_VERSION=8.30.1
ARG TRIVY_VERSION=0.73.0
ARG SEMGREP_VERSION=1.172.0
ARG CHECKOV_VERSION=3.3.9

# -------------------------
# Install system dependencies
# -------------------------
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    unzip \
    python3 \
    python3-pip \
    gnupg \
    ca-certificates \
    file \
 && rm -rf /var/lib/apt/lists/*

# -------------------------
# Install Gitleaks
# -------------------------
RUN set -eux; \
    case "${TARGETARCH}" in \
        amd64) GITLEAKS_ARCH="x64" ;; \
        arm64) GITLEAKS_ARCH="arm64" ;; \
        *) echo "Unsupported architecture: ${TARGETARCH}"; exit 1 ;; \
    esac; \
    curl -L \
      "https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_linux_${GITLEAKS_ARCH}.tar.gz" \
      -o /tmp/gitleaks.tar.gz; \
    tar -xzf /tmp/gitleaks.tar.gz -C /tmp; \
    mv /tmp/gitleaks /usr/local/bin/gitleaks; \
    chmod +x /usr/local/bin/gitleaks; \
    rm -f /tmp/gitleaks.tar.gz; \
    gitleaks version

# -------------------------
# Install Trivy
# -------------------------
RUN set -eux; \
    case "${TARGETARCH}" in \
        amd64) TRIVY_ARCH="64bit" ;; \
        arm64) TRIVY_ARCH="ARM64" ;; \
        *) echo "Unsupported architecture: ${TARGETARCH}"; exit 1 ;; \
    esac; \
    curl -L \
      "https://github.com/aquasecurity/trivy/releases/download/v${TRIVY_VERSION}/trivy_${TRIVY_VERSION}_Linux-${TRIVY_ARCH}.tar.gz" \
      -o /tmp/trivy.tar.gz; \
    tar -xzf /tmp/trivy.tar.gz -C /tmp; \
    mv /tmp/trivy /usr/local/bin/trivy; \
    chmod +x /usr/local/bin/trivy; \
    rm -rf /tmp/trivy*; \
    trivy --version

# -------------------------
# Install Semgrep
# -------------------------
RUN pip3 install --break-system-packages \
    semgrep==${SEMGREP_VERSION}

RUN semgrep --version

# -------------------------
# Install Checkov
# -------------------------
RUN pip3 install --break-system-packages \
    checkov==${CHECKOV_VERSION}

RUN checkov --version

# -------------------------
# Application
# -------------------------
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/server.js"]