-- ============================================================================
-- ESSOR COMPLIANCE SOLUTIONS - COMPLETE HOSTINGER MYSQL / MARIADB SCHEMA
-- Designed for production deployment on Hostinger cPanel / hPanel phpMyAdmin
-- Compatible with MySQL 5.7+, MySQL 8.0+, and MariaDB 10.3+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `essor_compliance` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `essor_compliance`;

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Table: users (Administrators, Auditors, Clients, Trainers)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `role` ENUM('SUPER_ADMIN', 'ADMIN', 'AUDITOR', 'CLIENT_ADMIN', 'TRAINER') NOT NULL DEFAULT 'CLIENT_ADMIN',
  `org_id` VARCHAR(64) DEFAULT NULL,
  `organization_name` VARCHAR(191) DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `phone` VARCHAR(32) DEFAULT NULL,
  `last_login_at` DATETIME DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: organizations (Client Food Facilities, Manufacturers, Packagers)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `organizations`;
CREATE TABLE `organizations` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `sector` VARCHAR(128) NOT NULL,
  `facility_type` VARCHAR(128) NOT NULL,
  `contact_name` VARCHAR(128) NOT NULL,
  `contact_email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(32) DEFAULT NULL,
  `address` TEXT NOT NULL,
  `city` VARCHAR(96) NOT NULL,
  `state` VARCHAR(96) NOT NULL,
  `country` VARCHAR(96) NOT NULL DEFAULT 'India',
  `postal_code` VARCHAR(32) DEFAULT NULL,
  `audit_readiness_score` INT NOT NULL DEFAULT 75,
  `assigned_auditor_id` VARCHAR(64) DEFAULT NULL,
  `standards` JSON DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_org_sector` (`sector`),
  INDEX `idx_org_readiness` (`audit_readiness_score`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: visits (Facility Audits, Mock Assessments, Technical Visits)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `visits`;
CREATE TABLE `visits` (
  `id` VARCHAR(64) NOT NULL,
  `org_id` VARCHAR(64) NOT NULL,
  `organization_name` VARCHAR(191) NOT NULL,
  `auditor_id` VARCHAR(64) NOT NULL,
  `auditor_name` VARCHAR(128) NOT NULL,
  `scheduled_date` DATE NOT NULL,
  `visit_type` ENUM('GAP_ASSESSMENT', 'MOCK_AUDIT', 'SURVEILLANCE', 'HYGIENE_INSPECTION', 'CAPA_VERIFICATION') NOT NULL,
  `status` ENUM('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'REPORT_PENDING', 'CANCELLED') NOT NULL DEFAULT 'SCHEDULED',
  `scope` VARCHAR(255) NOT NULL,
  `overall_score` INT DEFAULT NULL,
  `findings_count` INT NOT NULL DEFAULT 0,
  `critical_findings` INT NOT NULL DEFAULT 0,
  `major_findings` INT NOT NULL DEFAULT 0,
  `minor_findings` INT NOT NULL DEFAULT 0,
  `report_url` VARCHAR(255) DEFAULT NULL,
  `summary_notes` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_visits_org` (`org_id`),
  INDEX `idx_visits_date` (`scheduled_date`),
  INDEX `idx_visits_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: certificates (Publicly Verifiable QR Certificates)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `certificates`;
CREATE TABLE `certificates` (
  `id` VARCHAR(64) NOT NULL,
  `certificate_number` VARCHAR(128) NOT NULL UNIQUE,
  `recipient_name` VARCHAR(191) NOT NULL,
  `organization_name` VARCHAR(191) NOT NULL,
  `course_id` VARCHAR(64) DEFAULT NULL,
  `course_name` VARCHAR(191) NOT NULL,
  `standard_code` VARCHAR(64) NOT NULL,
  `issue_date` DATE NOT NULL,
  `expiry_date` DATE DEFAULT NULL,
  `status` ENUM('ACTIVE', 'EXPIRED', 'REVOKED', 'PENDING') NOT NULL DEFAULT 'ACTIVE',
  `grade` VARCHAR(32) NOT NULL DEFAULT 'Pass',
  `score` INT DEFAULT NULL,
  `lead_trainer_name` VARCHAR(128) NOT NULL,
  `verification_url` VARCHAR(255) NOT NULL,
  `qr_data` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_cert_number` (`certificate_number`),
  INDEX `idx_cert_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: corrective_actions (CAPA Tracker)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `corrective_actions`;
CREATE TABLE `corrective_actions` (
  `id` VARCHAR(64) NOT NULL,
  `visit_id` VARCHAR(64) NOT NULL,
  `org_id` VARCHAR(64) NOT NULL,
  `clause` VARCHAR(64) NOT NULL,
  `severity` ENUM('CRITICAL', 'MAJOR', 'MINOR', 'OBSERVATION') NOT NULL,
  `finding_description` TEXT NOT NULL,
  `root_cause` TEXT DEFAULT NULL,
  `corrective_action_plan` TEXT NOT NULL,
  `preventive_action_plan` TEXT DEFAULT NULL,
  `responsible_person` VARCHAR(128) NOT NULL,
  `target_date` DATE NOT NULL,
  `completion_date` DATE DEFAULT NULL,
  `status` ENUM('OPEN', 'IN_REVIEW', 'VERIFIED_CLOSED', 'OVERDUE') NOT NULL DEFAULT 'OPEN',
  `evidence_files` JSON DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_capa_org` (`org_id`),
  INDEX `idx_capa_status` (`status`),
  INDEX `idx_capa_severity` (`severity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: enquiries (Business & Training Inquiries from Website)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `enquiries`;
CREATE TABLE `enquiries` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `company_name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(32) NOT NULL,
  `service_type` VARCHAR(128) NOT NULL,
  `facility_size` VARCHAR(64) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('NEW', 'CONTACTED', 'IN_DISCUSSION', 'PROPOSAL_SENT', 'CONVERTED', 'CLOSED') NOT NULL DEFAULT 'NEW',
  `assigned_to` VARCHAR(128) DEFAULT NULL,
  `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL DEFAULT 'MEDIUM',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_enq_status` (`status`),
  INDEX `idx_enq_email` (`email`),
  INDEX `idx_enq_date` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: services (Catalog of Food Safety Advisory & Audit Services)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `short_description` TEXT NOT NULL,
  `full_description` LONGTEXT NOT NULL,
  `icon_name` VARCHAR(64) NOT NULL,
  `category` ENUM('AUDIT_PREP', 'CONSULTING', 'MANAGED_HYGIENE', 'DIGITAL_MODULE') NOT NULL,
  `turnaround_time` VARCHAR(64) DEFAULT NULL,
  `deliverables` JSON DEFAULT NULL,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_services_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: training_courses (Accredited Academy Training Programs)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `training_courses`;
CREATE TABLE `training_courses` (
  `id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `code` VARCHAR(64) NOT NULL UNIQUE,
  `level` ENUM('FOUNDATION', 'INTERMEDIATE', 'ADVANCED', 'LEAD_AUDITOR') NOT NULL,
  `duration_hours` INT NOT NULL,
  `target_audience` VARCHAR(255) NOT NULL,
  `learning_outcomes` JSON DEFAULT NULL,
  `prerequisites` VARCHAR(255) DEFAULT NULL,
  `certification_awarded` VARCHAR(191) NOT NULL,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_course_level` (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: cms_content (Dynamic Site Content: Phone, Address, Banner, Stats)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `cms_content`;
CREATE TABLE `cms_content` (
  `content_key` VARCHAR(64) NOT NULL,
  `content_value` LONGTEXT NOT NULL,
  `updated_by` VARCHAR(128) DEFAULT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`content_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: audit_logs (Immutable System Compliance Audit Trail)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE `audit_logs` (
  `id` VARCHAR(64) NOT NULL,
  `actor_name` VARCHAR(128) NOT NULL,
  `actor_email` VARCHAR(191) NOT NULL,
  `action` VARCHAR(64) NOT NULL,
  `entity_type` VARCHAR(64) NOT NULL,
  `entity_id` VARCHAR(64) NOT NULL,
  `summary` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_logs_entity` (`entity_type`, `entity_id`),
  INDEX `idx_logs_actor` (`actor_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- SEED INITIAL SYSTEM DATA (Vivek Baliyan Super Admin & Official Contacts)
-- ----------------------------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `role`, `is_active`, `phone`) 
VALUES 
  ('usr-1', 'Vivek Baliyan (Lead Administrator)', 'iamvivekbaliyan07@gmail.com', 'SUPER_ADMIN', 1, '+91 63958 43850')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

INSERT INTO `cms_content` (`content_key`, `content_value`)
VALUES 
  ('business_email', 'business@essorcompliance.com'),
  ('training_email', 'training@essorcompliance.com'),
  ('contact_phone', '+91 63958 43850'),
  ('office_address', 'IT Park Campus, Sahastradhara Road, Dehradun, Uttarakhand 248013, India')
ON DUPLICATE KEY UPDATE `content_value` = VALUES(`content_value`);
