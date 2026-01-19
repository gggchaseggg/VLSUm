package grachev.lab9;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public class StudentRepository {

    private final JdbcTemplate jdbcTemplate;

    public StudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void createProcessedTable() {
        jdbcTemplate.execute("""
            CREATE TABLE IF NOT EXISTS processed_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_id INT,
                request_time TIMESTAMP,
                status VARCHAR(50)
            )
            """);
    }

    public List<Map<String, Object>> getAllStudents() {
        return jdbcTemplate.queryForList("SELECT * FROM students");
    }

    public Map<String, Object> getStudentById(int id) {
        return jdbcTemplate.queryForMap("SELECT * FROM students WHERE id = ?", id);
    }

    public void addStudent(int id, String name, int birthYear, String faculty) {
        jdbcTemplate.update(
                "INSERT INTO students (id, name, birth_year, faculty, status) VALUES (?, ?, ?, ?, 'ACTIVE')",
                id, name, birthYear, faculty
        );
    }
}