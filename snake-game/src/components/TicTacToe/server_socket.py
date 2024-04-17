\
import socket
import sys
from threading import Thread
import json
import struct

HOST = '0.0.0.0'  # endereço IP
PORT = 20001        # Porta utilizada pelo servidor
BUFFER_SIZE = 1024  # tamanho do buffer para recepção dos dados


def is_ip_in_range(ip_address, start_range, end_range):
    # Convert IP address to integer
    ip_int = int(ip_address.replace('.', ''))
    start_int = int(start_range.replace('.', ''))
    end_int = int(end_range.replace('.', ''))

    return start_int <= ip_int <= end_int


def on_new_client(clientsocket, addr):
    """
    Lida com uma nova conexão de cliente.

    Parâmetros:
    - clientsocket (socket): Socket do cliente.
    - addr (tuple): Tupla contendo o endereço IP e porta do cliente.
    - Ar (Ar-Condicionado): Instância da classe ArCondicionado.
    """
    try:
        client_ip = addr[0]
        while True:
            data = clientsocket.recv(BUFFER_SIZE)
            if not data:
                break
            texto_recebido = data.decode('utf-8')
            print('recebido do cliente {} na porta {}: {}'.format(
                addr[0], addr[1], texto_recebido))
            # Tenta converter a mensagem recebida para um dicionário JSON
            try:
                mensagem_json = json.loads(texto_recebido)
            except json.JSONDecodeError:
                mensagem_json = {}
    except Exception as err:
        print(err)


def main_server(argv):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
            server_socket.bind((HOST, PORT))
            server_socket.listen()

            print('Aguardando conexões...')
            while True:
                clientsocket, addr = server_socket.accept()
                print('Conectado ao cliente no endereço:', addr)
                t = Thread(target=on_new_client, args=(
                    clientsocket, addr))
                t.start()

    except Exception as error:
        print("Erro na execução do servidor!!")
        print(error)
        return


if __name__ == "__main__":
    main_server(sys.argv[1:])
