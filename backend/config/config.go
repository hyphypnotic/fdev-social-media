package config

// Config is the root configuration structure
type Config struct {
	HTTP     HTTPConfig
	Database DatabaseConfig
}

// HTTPConfig holds HTTP-related configuration
type HTTPConfig struct {
	Port    int
	Timeout int
}

// DatabaseConfig holds database-related configuration
type DatabaseConfig struct {
	Port     int
	Host     string
	User     string
	Password string
	Name     string
}

// GetConfig initializes and returns a default Config instance
func GetConfig() *Config {
	return &Config{
		HTTP: HTTPConfig{
			Port:    8080,
			Timeout: 5,
		},
		Database: DatabaseConfig{
			Port:     5432,
			Host:     "localhost",
			User:     "root",
			Password: "",
			Name:     "pg-social-media",
		},
	}
}
