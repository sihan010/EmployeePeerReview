using System;
using System.Security.Cryptography;

namespace EmployeePeerReview.Utilities
{
    public class PasswordHashUtility
    {
        public const int SaltByteSize = 24;
        public const int HashByteSize = 32; // to match the size of the PBKDF2-HMAC-SHA-256 hash 
        public const int Pbkdf2Iterations = 10000;

        public static string HashString(string password)
        {
            var cryptoProvider = new RNGCryptoServiceProvider();
            byte[] salt = new byte[SaltByteSize];
            cryptoProvider.GetBytes(salt);

            var hash = GetPbkdf2Bytes(password, salt, Pbkdf2Iterations, HashByteSize);
            return Convert.ToBase64String(salt) + Convert.ToBase64String(hash);
        }

        public static bool ValidatePassword(string password, string correctHash)
        {
            if (correctHash.Length == 76)
            {
                string strSalt = correctHash.Substring(0, 32);
                string strHash = correctHash.Substring(32);

                var salt = Convert.FromBase64String(strSalt);
                var db_Hash = Convert.FromBase64String(strHash);

                var write_Hash = GetPbkdf2Bytes(password, salt, Pbkdf2Iterations, db_Hash.Length);
                return SlowEquals(db_Hash, write_Hash);
            }
            else
            {
                return false;
            }
        }

        private static bool SlowEquals(byte[] a, byte[] b)
        {
            var diff = (uint)a.Length ^ (uint)b.Length;
            for (int i = 0; i < a.Length && i < b.Length; i++)
            {
                diff |= (uint)(a[i] ^ b[i]);
            }
            return diff == 0;
        }

        private static byte[] GetPbkdf2Bytes(string password, byte[] salt, int iterations, int outputBytes)
        {
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt);
            pbkdf2.IterationCount = iterations;
            return pbkdf2.GetBytes(outputBytes);
        }
    }
}
