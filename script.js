import java.security.SecureRandom;
import java.util.Scanner;

public class GeneradorContrasenas {
    private static final String MAYUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
    private static final String NUMEROS = "0123456789";
    private static final String ESPECIALES = "!@#$%^&*()";
    private static final String TODOS = MAYUSCULAS + MINUSCULAS + NUMEROS + ESPECIALES;
    private static final SecureRandom random = new SecureRandom();

    public static String generarContrasena(int longitud) {
        if (longitud < 8) {
            throw new IllegalArgumentException("La longitud debe ser al menos 8 caracteres.");
        }
        
        StringBuilder contrasena;
        do {
            contrasena = new StringBuilder();
            contrasena.append(MAYUSCULAS.charAt(random.nextInt(MAYUSCULAS.length())));
            contrasena.append(MINUSCULAS.charAt(random.nextInt(MINUSCULAS.length())));
            contrasena.append(NUMEROS.charAt(random.nextInt(NUMEROS.length())));
            contrasena.append(ESPECIALES.charAt(random.nextInt(ESPECIALES.length())));
            
            for (int i = 4; i < longitud; i++) {
                contrasena.append(TODOS.charAt(random.nextInt(TODOS.length())));
            }
        } while (!esValida(contrasena.toString()));
        
        return contrasena.toString();
    }

    private static boolean esValida(String contrasena) {
        return contrasena.matches(".*[A-Z].*") && contrasena.matches(".*[a-z].*") &&
               contrasena.matches(".*[0-9].*") && contrasena.matches(".*[!@#$%^&*()].*");
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Ingrese la longitud de la contraseña (mínimo 8): ");
        int longitud = scanner.nextInt();
        scanner.close();

        try {
            String contrasena = generarContrasena(longitud);
            System.out.println("Contraseña generada: " + contrasena);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
