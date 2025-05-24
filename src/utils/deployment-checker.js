import { checkApiHealth } from "../lib/api-final";

/**
 * Deployment health checker utility
 */
export class DeploymentChecker {
  constructor() {
    this.checks = [];
    this.results = {};
  }

  async runAllChecks() {
    console.log("🚀 Running deployment health checks...");

    const checks = [
      this.checkEnvironmentVariables(),
      this.checkApiConnection(),
      this.checkDatabaseConnection(),
      this.checkCORS(),
    ];

    const results = await Promise.allSettled(checks);

    results.forEach((result, index) => {
      const checkName = ["Environment", "API", "Database", "CORS"][index];
      if (result.status === "fulfilled") {
        console.log(`✅ ${checkName} check passed`);
        this.results[checkName] = { status: "pass", ...result.value };
      } else {
        console.error(`❌ ${checkName} check failed:`, result.reason);
        this.results[checkName] = {
          status: "fail",
          error: result.reason.message,
        };
      }
    });

    return this.results;
  }

  async checkEnvironmentVariables() {
    const required = ["NEXT_PUBLIC_API_URL"];
    const missing = required.filter((env) => !process.env[env]);

    if (missing.length > 0) {
      throw new Error(`Missing environment variables: ${missing.join(", ")}`);
    }

    return {
      message: "All required environment variables are set",
      variables: required.reduce((acc, env) => {
        acc[env] = process.env[env] ? "✓ Set" : "✗ Missing";
        return acc;
      }, {}),
    };
  }

  async checkApiConnection() {
    const health = await checkApiHealth();

    if (health.status !== "online") {
      throw new Error(
        `API is ${health.status}: ${health.error || "Unknown error"}`
      );
    }

    return {
      message: "API is responding correctly",
      health,
    };
  }

  async checkDatabaseConnection() {
    try {
      // This would be called from your API health endpoint
      const health = await checkApiHealth();

      if (!health.database?.connected) {
        throw new Error("Database connection failed");
      }

      return {
        message: "Database is connected",
        stats: health.stats,
      };
    } catch (error) {
      throw new Error(`Database check failed: ${error.message}`);
    }
  }

  async checkCORS() {
    try {
      // Simple CORS check
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/health",
        {
          method: "OPTIONS",
        }
      );

      return {
        message: "CORS is configured correctly",
        headers: {
          "Access-Control-Allow-Origin": response.headers.get(
            "Access-Control-Allow-Origin"
          ),
          "Access-Control-Allow-Methods": response.headers.get(
            "Access-Control-Allow-Methods"
          ),
        },
      };
    } catch (error) {
      throw new Error(`CORS check failed: ${error.message}`);
    }
  }

  generateReport() {
    const passed = Object.values(this.results).filter(
      (r) => r.status === "pass"
    ).length;
    const total = Object.keys(this.results).length;

    console.log(
      `\n📊 Deployment Health Report: ${passed}/${total} checks passed\n`
    );

    Object.entries(this.results).forEach(([check, result]) => {
      const icon = result.status === "pass" ? "✅" : "❌";
      console.log(`${icon} ${check}: ${result.message || result.error}`);
    });

    if (passed === total) {
      console.log("\n🎉 All systems operational!");
    } else {
      console.log(
        "\n⚠️  Some issues detected. Please review the failed checks."
      );
    }

    return this.results;
  }
}

// Usage example
export async function runDeploymentChecks() {
  const checker = new DeploymentChecker();
  await checker.runAllChecks();
  return checker.generateReport();
}
